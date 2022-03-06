# frozen-string-literal: true

Rails.application.routes.draw do
  root 'todos#index'
  get 'todos/all_todos'
  post 'todos/create'
  put 'todos/update'
end
