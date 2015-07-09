class Ability
  include CanCan::Ability

  def initialize(user)
    
    # Cualquiera no loggeado
    cannot :manage, :all
    
    can :manage, :display
    can :create, :registration
    can [:create, :get], :session
    can [:create, :update], :password
    can :ipn, Payment
    can :by_xango_id, User
    can [:finish_video, :watch_video], Plan
    can :stream, Asset
    can :by_code, Test

    if user.instance_of? User
      #answers, no individual use of it
      can [:by_keyword_and_asset_type, :by_asset_type], Asset
      can [:create_by_user_id, :destroy], CollageImage 
      can :by_user, Collage
      can [:create, :update, :destroy, :by_user], Contact
      can :current, Event
      can [:create, :update, :destroy, :by_user], Goal
      can :create, Invitation
      can :ordered_by_name, Office
      can [:send_video], Plan
      #questions, no individual use of it
      can [:create, :accept, :reject], Request
      can :destroy, :session
      can :grade_test, TestScore
      can [:by_user, :by_code_and_user], Test
      can [:update, :all, :cycle, :change_position, :progress], User

      if user.role? :premier
        can :manage, Event 
        can :manage, Invitation
        can :manage, Office
        can :manage, Test
        can :manage, User
      end
    end
 
  end
  
end
