class ApplicationController < ActionController::Base
	def index
	@scores = Score.all
	end
end
