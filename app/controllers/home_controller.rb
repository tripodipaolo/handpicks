class HomeController < ApplicationController
  def index
    already_following_users = [current_user.id, current_user.followees(User).pluck(:id)].flatten
    @to_follow = User.where
                     .not(id: already_following_users)
                     .last(3)
    @feed = Story.where(user: current_user.followees(User))
                 .where.not(published_at: nil)
                 .order('published_at DESC')
                 .last(10)
  end

  def bookmarks
    @to_follow = User.where.not(id: [current_user.id, current_user.followees(User).pluck(:id)].flatten).last(3)
    @feed = Story.where(id: current_user.likees(Story)
                 .pluck(:id))
                 .order('published_at DESC')
                 .last(10)
  end
end
