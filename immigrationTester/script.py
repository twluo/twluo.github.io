print("HELLO")
f = open("en_civics.txt", "r")
solutions = []
question =  ""
answer = "                     "
for x in f:
    if x != "\n":
        line = x.strip()
        if line[0] >= '0' and line[0] <= '9':
            if answer[1] == ',':
                solutions.append(question + ";" + answer[3:])
            else:
                solutions.append(question + ";" + answer[1:])
            question = line
            answer = ""
        else:
            if line[0] == '.':
                line = ',' + line[1:]
            answer = answer + " " + line
if answer and answer[0] == ',':
    solutions.append(question + ";" + answer[2:])
else:
    solutions.append(question + ";" + answer[1:])
print(solutions)
