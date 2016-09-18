class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    @feed = @user.stories.where.not(published_at: nil)
  end

  def drafts
    @user = User.find(params[:id])
    if @user != current_user
      return redirect_to root_path
    end
    @feed = @user.stories.where(published_at: nil)
  end

  def follow
    user = User.find(params[:id])
    current_user.follow!(user)
    respond_to do |format|
      format.js {render inline: "location.reload();" }
      format.html {redirect_to root_path}
    end
  end

  def unfollow
    user = User.find(params[:id])
    current_user.unfollow!(user)
    respond_to do |format|
      format.js {render inline: "location.reload();" }
      format.html {redirect_to root_path}
    end
  end
end
