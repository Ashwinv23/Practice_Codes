require 'json'

# parse the JSON to read the input
questions = JSON.parse(open('input.json').read)['questionsFormat']

# find marks for each difficulty
total_marks = questions.last['totalMarks']
easy_marks = (questions.last['easy'] / 100.0 * total_marks)
medium_marks = (questions.last['medium'] / 100.0 * total_marks)
hard_marks = (questions.last['hard'] / 100.0 * total_marks)

# initialize variables
counter = 0
easy_array = []
medium_array = []
hard_array = []

# find the sum of hash values which corresponds to marks passed and return the keys
def find_questions(hash, marks)
  arr = hash.to_a
  (1..arr.size).find do |i|
    enum = arr.combination(i).find { |h| h.map(&:last).sum == marks }
    return enum.map(&:first) unless enum.nil?
  end
end

# loop through the input and sort questions based on difficulty
while counter < 10
  if questions[counter]['difficulty'] == 'easy'
    easy_array << questions[counter]["question_id#{counter + 1}"]
    easy_array << questions[counter]['marks']
    easy_hash = Hash[*easy_array.flatten]

  elsif questions[counter]['difficulty'] == 'medium'
    medium_array << questions[counter]["question_id#{counter + 1}"]
    medium_array << questions[counter]['marks']
    medium_hash = Hash[*medium_array.flatten]
  else
    hard_array << questions[counter]["question_id#{counter + 1}"]
    hard_array << questions[counter]['marks']
    hard_hash = Hash[*hard_array.flatten]
  end
  counter += 1
end

# print the values returned(question numbers) by calling the method for each difficulty
puts find_questions(easy_hash, easy_marks)
puts find_questions(hard_hash, hard_marks)
puts find_questions(medium_hash, medium_marks)
