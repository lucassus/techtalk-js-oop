class Product < ActiveRecord::Base
  include JqGrid
  belongs_to :category

  def self.grid_data(params)
    page, per_page = extract_page_options(params)
    products = find(:all) do
      category_id == params[:category_id] if params[:category_id]
      
      paginate :page => page, :per_page => per_page
      order_by "#{params[:sidx]} #{params[:sord]}"
    end

    return build_jqgrid_hash(products, page, per_page) do |row|
      {:name => row.name,
        :price => row.price, :promotion => row.promotion?.to_s,
        :quantity => row.quantity, :created_at => row.created_at.to_s(:db)}
    end
  end

end
