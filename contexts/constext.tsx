import * as React from "react"
import { useEffect, useState, useCallback } from "react"
import { createContext } from 'react'

export const QuestionsContext = createContext({
    questions: [],
    question: {},
    setQuestion: (question: any) => { },
    onPressAddQuestion: ({ question }: { question: any }) => { },
    onPressDeleteQuestion: ({ questionId }: { questionId: String }) => { },
    setIsTabsVisible: (val: boolean) => { },
    onPressAddResponse: ({ response }: { response: any }) => { },
    currentQuestionIndex: 0,
    onPressNextQuestion: () => { },

})

export const QuestionsProvider = (props: any) => {
    const [data, setData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone_number: '',

        check_textInputChange: false,
        check_email: false,

        order_status: false,
        password_changes: false,
        special_offers: false,
        newsletters: false,
        image: '',
    });
    const [question, setQuestion] = useState({})
    const [insertQuestion, { error, loading: insertQuestionLoading, data: insertQuestionData }] = useMutation(QUESTIONS_MUTATION);
    const [deleteQuestion, { loading: deleting, error: deleteError }] = useMutation(DELETE_QUESTION);
    const [insertResponse, { loading: insertResponseLoading, error: addResponseError, data: addResponseData }] = useMutation(ADD_RESPONSE);
    const { children, setIsTabsVisible } = props
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const onPressNextQuestion = useCallback(
        () => {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setQuestion(data.question[currentQuestionIndex + 1])
        },
        [currentQuestionIndex, setCurrentQuestionIndex, data, setQuestion],
    )

    useEffect(() => {
        if (data?.question && !Object.keys(question).length) {
            setQuestion(data?.question[0])
            // console.log(data?.question)
        }
    }, [data])

    const onPressAddQuestion = ({ text }: { text: String }) => {
        insertQuestion({
            variables: {
                question: text
            },
        });

    }

    const onPressAddResponse = ({ response_1, response_2, question_id, user_id, report }: { response_1: Object, response_2: Object, question_id: String, user_id: String, report: Object }) => {
        insertResponse({
            variables: {
                response_1: response_1,
                response_2: response_2,
                question_id: question_id,
                user_id: user_id,
                report: report
            },
        })
    }

    const onPressDeleteQuestion = ({ questionId }: { questionId: String }) => {
        deleteQuestion({
            variables: {
                id: questionId
            },
        });
    }

    return (
        <QuestionsContext.Provider
            value={{
                questions: data?.question,
                // questions: data,
                question,
                setQuestion,
                onPressAddQuestion,
                onPressDeleteQuestion,
                setIsTabsVisible,
                onPressAddResponse,
                currentQuestionIndex,
                onPressNextQuestion,

            }}
        >
            {children}
        </QuestionsContext.Provider>
    )
}