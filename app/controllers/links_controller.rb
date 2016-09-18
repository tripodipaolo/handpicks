class LinksController < ApplicationController
  def scrape
    begin
      page = LinkThumbnailer.generate(link_params[:url])
      host = URI.parse(link_params[:url]).host
      render json: {
        thumbnail: page.images.first,
        title: page.title,
        host: host,
        favicon: page.favicon
      }
    rescue LinkThumbnailer::Exceptions => e
      render json: e.to_json
    end
  end

  private

  def link_params
    params.permit(:url)
  end
end
