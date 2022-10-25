Rails.application.routes.draw do
   resources :users, only: [:show, :create]
   resources :clinics, only: [:index, :show]
   resources :vets, only: [:index, :show]
   resources :pets, only: [:index, :show]
   resources :pet_owners, only: [:index]
   resources :owners, only: [:index, :show] do
      resources :pets, only: [:index, :show]
   end
   resources :visits, only: [:index, :show]

   get '/auth', to: 'users#show'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
