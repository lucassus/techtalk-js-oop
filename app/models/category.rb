class Category < ActiveRecord::Base
  include JqGrid
  has_many :products

    def self.grid_data(params)
    page, per_page = extract_page_options(params)
    products = find(:all) do
      paginate :page => page, :per_page => per_page
      order_by "#{params[:sidx]} #{params[:sord]}"
    end

    return build_jqgrid_hash(products, page, per_page) do |row|
      {:name => row.name, :created_at => row.created_at.to_s(:db)}
    end
  end
end
