Factory.define :category do |c|
  c.name { Faker::Lorem.words(4).join(' ').camelize }
  c.description { Faker::Lorem.paragraphs(2).join("\n") }
end
