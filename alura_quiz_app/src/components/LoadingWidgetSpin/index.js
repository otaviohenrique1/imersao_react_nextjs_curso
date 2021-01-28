import styled from 'styled-components';

const LoadingWidgetSpin = styled.div`
    position: relative;
    left: 50%;
    /* top: 50%; */
    z-index: 1;
    width: 40px;
    height: 40px;
    margin: -76px 0 0 -76px;
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
`;

export default LoadingWidgetSpin;
