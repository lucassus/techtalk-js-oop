Factory.define :product do |p|
  p.name { Faker::Lorem.words(4).join(' ').camelize }
  p.description { Faker::Lorem.paragraphs(2).join("\n") }
  p.price { Faker.numerify('##.##') }
  p.quantity { rand(100) }
  p.promotion { [true, false].rand }
end
