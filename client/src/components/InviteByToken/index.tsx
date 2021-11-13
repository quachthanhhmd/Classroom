import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { inviteCourseByToken } from '../../actions';
import { AppState } from '../../reducers';


const InviteByToken = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const history = useHistory();
    const course = useSelector((state: AppState) => state.course);
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const role = new URLSearchParams(search).get('role');
    const dispatch = useDispatch();
    console.log(course.isSuccess);
    useEffect(() => {
        console.log(token, role);
        dispatch(inviteCourseByToken(+courseId, token!, role!))
    }, [])

    useEffect(() => {
        if (!token || !role) history.push('/');
    }, [])

    useEffect(() => {
        if (course.isSuccess) {
            console.log("Thanh Cong");
            history.push(`/course/${courseId}`);
        }
    }, [course.isSuccess, history])
    return (
        <></>
    )
}

export default InviteByToken;