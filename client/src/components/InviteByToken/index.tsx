import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { inviteCourseByToken } from '../../actions';
import { AppState } from '../../reducers';
import { SnackBarRender } from '../SnackBar';


const InviteByToken = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const history = useHistory();
    const course = useSelector((state: AppState) => state.course);
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const role = new URLSearchParams(search).get('role');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(inviteCourseByToken(+courseId, token!, role!))
    }, [])

    useEffect(() => {
        if (!token || !role) history.push('/');
    }, [])

    useEffect(() => {
        if (course.isSuccess) {
            history.push(`/course/${courseId}`);
        }
        else {
            history.push(`/`);
        }

    }, [course, history])
    return (
        <>
        </>
    )
}

export default InviteByToken;