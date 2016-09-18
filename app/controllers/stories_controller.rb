class StoriesController < ApplicationController
  def show
    @story = Story.find(params[:id])
    raise ActiveRecord::RecordNotFound unless @story.published_at.presence
  end

  def new
    @story = current_user.stories.new
  end

  def create
    @story = current_user.stories.create(story_params)
    render json: @story
  end

  def edit
    @story = Story.find(params[:id])
  end

  def destroy
    @story = Story.find(params[:id])

    @story.destroy
    redirect_to drafts_user_path(@story.user)
  end

  def update
    @story = Story.find(params[:id])

    if @story.update(story_params)
      render json: @story
    else
      render json: @story.errors.full_messages
    end
  end

  def publish
    @story = Story.find(params[:id])

    links = Nokogiri::HTML.parse(@story.content)
                          .css('a')
                          .map { |link| link['href'] }

    @story.links = links.map do |link_url|
      begin
        page = LinkThumbnailer.generate(link_url)
        host = URI.parse(link_url).host
        link = Link.new(
          url: link_url,
          thumbnail_url: page.images.first,
          title: page.title,
          host: host,
          favicon_url: page.favicon
        )

        res = Net::HTTP.get_response(URI(link_url))
        link.embeddable = res.to_hash['x-frame-options'] != %w(DENY)
        link
      rescue LinkThumbnailer::Exceptions => e
        Rails.logger.info e
      end
    end

    @story.title = story_params[:title]
    @story.content = story_params[:content]
    @story.published_at = Time.now

    if @story.save
      render json: @story
    else
      render json: @story.errors.full_messages
    end
  end


  def bookmark
    story = Story.find(params[:id])
    current_user.like!(story)
    respond_to do |format|
      format.js {render inline: "location.reload();" }
    end
  end

  def unbookmark
    story = Story.find(params[:id])
    current_user.unlike!(story)
    respond_to do |format|
      format.js {render inline: "location.reload();" }
    end
  end

  private

  def story_params
    params.require(:story).permit(:title, :content)
  end
end
