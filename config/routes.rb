Rails.application.routes.draw do

   # custom routes
   get '/pets/breeds', to: 'pets#species_and_breeds'

   # default routes
   resources :users, only: [:show, :create]
   resources :clinics, only: [:index, :show]
   resources :vets, only: [:index, :show]
   resources :pets, only: [:index, :show, :create]
   resources :pet_owners, only: [:index]
   resources :owners, only: [:index, :show] do
      resources :pets, only: [:index, :show]
   end
   resources :visits, only: [:index, :show, :create]

   # login / logout
   get '/auth', to: 'users#show'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'

   # fallback
   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
