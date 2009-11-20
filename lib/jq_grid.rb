module JqGrid

  def self.included(model)
    model.extend ClassMethods
    model.send(:include, InstanceMethods)
  end

  module ClassMethods
    def extract_page_options(params)
      page = params[:page] || 1
      per_page = params[:rows] || 20
      return page, per_page
    end

    def build_jqgrid_hash(rows, page, rows_per_page, &bloc)
      { :page => page,
        :records => rows.total_entries,
        :total => rows.total_entries / rows_per_page.to_i + 1,
        :rows => rows.collect do |row|
          { :id => row.id }.merge(bloc.call(row))
        end
      }
    end
  end

  module InstanceMethods
  end

end
