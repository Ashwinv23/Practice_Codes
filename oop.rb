class Building
  attr_accessor :name, :width, :length
  def initialize(name, width, length)
    @name = name
    @width = width
    @length = length
  end

  def area
    @width * length
  end
end

class Castle < Building

end
