ActionController::Routing::Routes.draw do |map|
  map.resources :categories
  map.resources :products
  map.root :controller => :categories
end
