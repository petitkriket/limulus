class ApplicationController < ActionController::Base
	def index
	@scores = Score.all
	@score = Score.new
	gon.min_high_score = @scores.fifth
	end

end
