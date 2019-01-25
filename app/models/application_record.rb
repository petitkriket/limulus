class ApplicationRecord < ActiveRecord::Base
	default_scope { order(:mark).reverse_order() }
  self.abstract_class = true
end
