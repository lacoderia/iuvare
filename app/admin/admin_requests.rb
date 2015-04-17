ActiveAdmin.register Request, :as => "Solicitudes_de Acceso" do
	
  actions :all, :except => [:new, :show, :destroy]

  permit_params :status

  config.filters = false

  controller do
    def scoped_collection
      Request.pending.by_premier(current_premier)
    end
  end

  index :title => "Solicitudes" do
    column :source_name	
    column :source_email
    column :source_text
    column "Premier" do |request|
      "#{request.user.first_name} #{request.user.last_name}"
    end
    column :status
    actions :defaults => true
  end

  form do |f|
    f.inputs "Detalles de solicitudes" do
      f.input :source_name, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
      f.input :source_email, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
      f.input :source_text, :as => :text, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
      li "PREMIER - #{f.object.user.first_name} #{f.object.user.last_name}"
      f.input :status, :collection => Request::STATUSES.map{ |pairs| pairs[1] }
    end
    f.actions
  end
	

end
