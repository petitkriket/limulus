class ApplicationController < ActionController::Base
	def index
	@scores = Score.all
	@score = Score.new
	end

end
