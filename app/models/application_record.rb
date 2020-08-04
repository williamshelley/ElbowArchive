class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def keys
    self.attributes.keys.reject do |key|
        key == "updated_at" or key == "created_at" or key == "password_digest" or key =="session_token"
    end
  end
end
