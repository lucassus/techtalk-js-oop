namespace :doc do
  namespace :diagram do
    task :models do
      sh "railroad -i -a -m -M | dot -Tsvg | sed 's/font-size:14.00/font-size:11.00/g' > doc/models.svg"
      sh "railroad -b -i -a -m -M | dot -Tsvg | sed 's/font-size:14.00/font-size:11.00/g' > doc/models_brief.svg"
    end

    task :controllers do
      sh "railroad -i -l -C | neato -Tsvg | sed 's/font-size:14.00/font-size:11.00/g' > doc/controllers.svg"
    end
  end

  task :diagrams => %w(diagram:models diagram:controllers)
end
