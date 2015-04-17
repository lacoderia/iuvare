class Premier < User

  def self.default_scope 
    joins(:roles).where('roles.name = ?', 'premier')
  end

end
