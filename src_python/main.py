import json
import collections
import pandas
import os, time
import japanize_matplotlib
import matplotlib.pyplot as plt
from datetime import datetime
import six
import random

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

number_of_questions = 49
json_load_from_firestore = []
all_answer_list = []
ranking_list = []
target_person_list = []

json_open = open('result.json', 'r', encoding='utf-8')
json_load = json.load(json_open)

cred = credentials.Certificate("./credential.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

for doc in db.collections().__next__().get():

    value = doc.to_dict()

    if not ('name' in value.keys() and 'answers' in value.keys()):
        break

#    if len(value['answers']) != number_of_questions:
#        break

    json_load_from_firestore.append(doc.to_dict())

print(json_load_from_firestore)

def generate_answer_list():

    for name_index, value in enumerate(json_load):

        answer_dict = {}

        if not ('name' in value.keys() and 'answers' in value.keys()):
            break
        if len(value['answers']) != number_of_questions:
            break

        try:
            answer_dict.update({'name':value['name']})

            for answer_index, answer in enumerate(value['answers']):
                answer_dict[answer_index] = value['answers'][answer_index]['answer']

            all_answer_list.append(answer_dict)

        except Exception as e:
            print(e)

    print(all_answer_list)

    try:
        pandas.read_json(json.dumps(all_answer_list)).to_excel('answer_list' + datetime.now().strftime("%Y%m%d_%H%M%S")+'.xlsx',index=False)
    except Exception as e:
        print(e)

def compare_answers():

    compare_list = []

    for all_answer_index, value in enumerate(all_answer_list):

        target_name_dict = {}

        try:
            target_name_dict.update({'name':value['name']})
            target_answer_list = all_answer_list[all_answer_index]

            for target_answer_index, value in enumerate(all_answer_list):

                a = list(target_answer_list.items())
                b = list(all_answer_list[target_answer_index].items())
                score = len(set(a + b))

                target_name_dict.update({value['name'] : score})

            compare_list.append(target_name_dict)

        except Exception as e:
            print(e)

    try:
        pandas.read_json(json.dumps(compare_list)).to_excel('score_list' + datetime.now().strftime("%Y%m%d_%H%M%S")+'.xlsx',index=False)
    except Exception as e:
        print(e)

    print(compare_list)

def generate_ranking():

    for i in range(number_of_questions):

        answer_list = []

        for name_index, value in enumerate(json_load):

            try:
                answer_list.append(value['answers'][i]['answer'])
            except Exception as e:
                print(e)

        label_list = dict(collections.Counter(answer_list)).keys()
        count_list = dict(collections.Counter(answer_list)).values()
        ranking_list.append([list(label_list), list(count_list)])

    dict_all_answer_of_each_questions = {}

    for i in range(number_of_questions):
        questionNo = i

        for index, answer in enumerate(all_answer_list):
            dict_all_answer_of_each_questions[all_answer_list[index]['name']] = all_answer_list[index][questionNo]

        target_person_list_of_each_question = []

        for a_index, each_answer in enumerate(ranking_list[questionNo][0]):
            person = {k:v for k,v in six.iteritems(dict_all_answer_of_each_questions) if v == each_answer}

            target_persons = list(person.keys())
            random.shuffle(target_persons)
            target_person_list_of_each_question.append(target_persons[0])

            print(target_person_list_of_each_question)

        ranking_list[questionNo].append(target_person_list_of_each_question)

    f = open('ranking_list.txt', 'w', encoding='UTF-8')
    f.write(str(ranking_list))

if __name__ == "__main__":

    generate_answer_list()
    compare_answers()
    generate_ranking()
