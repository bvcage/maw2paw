Rails.application.routes.draw do
   resources :users, only: [:show, :create]
   resources :clinics, only: [:index, :show]
   resources :vets, only: [:index, :show]
   resources :pets, only: [:index, :show]
   resources :pet_owners, only: [:index]
   resources :owners, only: [:index, :show]
   resources :visits, only: [:index, :show]
   
   get '/hello', to: 'application#hello_world'

   get '/me', to: 'users#show'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
