# frozen-string-literal: true

# class TodosController controls todos
class TodosController < ApplicationController
  def all_todos
    completed = Todo.where(completed: true)
    pending = Todo.where(completed: false).order(:id)
    render json: { completed: completed, pending: pending }
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update!(todo_params)
      render json: { message: 'Todo item updated' }
    else
      render json: { message: 'an error occurred updating todo' }
    end
  end

  def create
    new_todo = Todo.create!(todo_params)
    if new_todo
      render json: { message: 'New todo created' }
    else
      render json: { message: 'An error occurred creating todo' }
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:id, :title, :completed, :updated_at, :created_at)
  end
end
