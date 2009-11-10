25.times do
  category = Factory.create(:category)
  50.times do
    Factory.create(:product, :category => category)
  end
end
