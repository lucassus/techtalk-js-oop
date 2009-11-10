ActionController::Routing::Routes.draw do |map|
  map.resources :categories
  map.root :controller => :categories
end
