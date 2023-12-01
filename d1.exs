
defmodule Day1 do
  def toInt(str) do
    try do
      if (str == "one"), do: 1
      if (str == "two"), do: 2
      if (str == "three"), do: 3
      if (str == "four"), do: 4
      if (str == "five"), do: 5
      if (str == "six"), do: 6
      if (str == "seven"), do: 7
      if (str == "eight"), do: 8
      if (str == "nine"), do: 9
      String.to_integer(str)
    rescue
      _ -> IO.puts str <> " is not a number"
    end
  end

  def firstN(str) do
    # Regex that finds the first single digit in the string, or the word "one"
    regex = ~r/(\d|one|two|three|four|five|six|seven|eight|nine)/
    # Returns the first match
    Regex.run(regex, str) |> Enum.at(1)
  end

  def lastN(str) do
    # Regex that finds the last single digit in the string, or the word "one"
    regex = ~r/^.*(\d|one|two|three|four|five|six|seven|eight|nine).*?$/
    # get the second element
    Regex.run(regex, str) |> Enum.at(1)
  end

  def p1(input) do
    input |> String.split("\n") |> Enum.reduce(0, fn x, acc ->
      firstDigit = firstN(x) |> toInt
      lastDigit = lastN(x) |> toInt
      acc + String.to_integer(Integer.to_string(firstDigit) <> Integer.to_string(lastDigit))
    end)
  end
end

p1 = Day1.p1("1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet")

IO.puts "p1 = #{p1}"
