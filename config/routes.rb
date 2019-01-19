Rails.application.routes.draw do
  resources :scores
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root to: 'visitors#index'
  devise_for :users
end
