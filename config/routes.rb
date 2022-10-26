Rails.application.routes.draw do

   # custom routes
   get '/pets/breeds', to: 'pets#species_and_breeds'

   # default routes
   resources :clinics, only: [:index, :show]
   resources :pet_owners, only: [:index]
   resources :users, only: [:show, :create]
   resources :vets, only: [:index, :show]
   resources :visits, only: [:index, :show, :create, :update]
   
   resources :owners, only: [:index, :show, :create, :update] do
      resources :pets, only: [:index, :show]
   end
   
   resources :pets, only: [:index, :show, :create, :update] do
      resources :visits, only: [:index]
   end
   
   # login / logout
   get '/auth', to: 'users#show'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'

   # fallback
   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
