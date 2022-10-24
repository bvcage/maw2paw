Rails.application.routes.draw do
  resources :clinics, only: [:index, :show]
  resources :vets, only: [:index, :show]
  resources :pets, only: [:index, :show]
  resources :pet_owners, only: [:index]
  resources :owners, only: [:index, :show]
  resources :visits, only: [:index, :show]
  
  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
