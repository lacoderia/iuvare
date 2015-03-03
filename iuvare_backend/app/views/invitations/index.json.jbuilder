json.array!(@invitations) do |invitation|
  json.extract! invitation, :id, :user_id, :recipient_name, :recipient_email, :token
  json.url invitation_url(invitation, format: :json)
end
