ActiveAdmin.register Event, :as => "Eventos" do
	
  actions :all, :except => [:show]

  permit_params :title, :date, :description, :picture

  config.filters = false

  index :title => "Solicitudes" do
    column :title	
    column :date
    column :description

    column :picture, :class => "photo_alignment" do |event|
      link_to( (image_tag event.picture.url(:thumb)), event.picture.url(:original), :target=>"_blank" )
    end
    
    actions :defaults => true
  end

  form do |f|
    f.inputs "Detalles de solicitudes" do
      f.input :title
      f.input :date
      f.input :description
      f.input :picture, :required => false, :as => :file
    end
    f.actions
  end
	

end
