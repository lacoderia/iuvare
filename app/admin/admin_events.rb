ActiveAdmin.register Event, :as => "Eventos" do
	
  actions :all, :except => [:show]

  permit_params :title, :date, :description, :picture, :event_type

  config.filters = false

  index :title => "Eventos" do
    column :title	
    column :date
    column :description
    column :event_type

    column :picture, :class => "photo_alignment" do |event|
      link_to( (image_tag event.picture.url(:thumb)), event.picture.url(:original), :target=>"_blank" )
    end
    
    actions :defaults => true
  end

  form do |f|
    f.inputs "Detalles de eventos" do
      f.input :title
      f.input :date
      f.input :description
      f.input :event_type, as: :select, collection: Event::TYPES.map{|t| t[0]}
      f.input :picture, :required => false, :as => :file
    end
    f.actions
  end	

end
