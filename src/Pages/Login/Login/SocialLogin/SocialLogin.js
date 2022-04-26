import React from 'react';
import Google from '../../../../images/google-logo3.png';
import facebook from '../../../../images/facebook.png';
import Github from '../../../../images/github-icon.png';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';


const SocialLogin = () => {
    const [singInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user2, loading2, error2] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    let errorElement;

    if(loading || loading2){
        return<Loading/>
    }


    if (error || error2) {
        errorElement = <p className='text-danger'>Error: {error?.message} {error2?.message}</p>
        
    }

    if (user || user2) {
        navigate(from, {replace: true});
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-primary w-50' ></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50' ></div>
            </div>
            {errorElement}
            <div>
                <button
                    onClick={() => singInWithGoogle()}
                    style={{ background: '#6C99F3' }} className='btn w-50 mx-auto d-block my-3'>
                    <img style={{ width: '28px' }} src={Google} alt='' />
                    <span className='px-1'>Google Sign In</span>

                </button>
                <button style={{ background: '#6C99F3' }} className='btn w-50 mx-auto d-block my-3'>
                    <img style={{ width: '28px' }} src={facebook} alt='' />
                    <span className='px-1'>facebook Sign In</span>

                </button>
                <button 
                onClick={() => signInWithGithub()}
                style={{ background: '#6C99F3' }} className='btn w-50 mx-auto d-block '>
                    <img style={{ width: '28px' }} src={Github} alt='' />
                    <span className='px-1'>Github Sign In</span>

                </button>
            </div>
        </div>
    );
};

export default SocialLogin;