import { Link } from 'react-router-dom'
import payment from '../../../assets/icon/payment.webp'
import fb from '../../../assets/icon/fb.png'
import instagram from '../../../assets/icon/instagram.png'
import linkedin from '../../../assets/icon/linkedin.png'
import twitter from '../../../assets/icon/twitter.png'
import moment from 'moment'
import ScrollToTop from 'react-scroll-to-top'

const Footer = () => {
    return (
        <div>
            <div>
                <ScrollToTop
                    style={{ bottom: '130px', right: '39px', borderRadius: '10%', background: '#000000' }}
                    width='45'
                    viewBox='20 10 240 190'
                    smooth
                    top={600}
                    color="#ffff"
                />
            </div>
            <footer className="footer p-12 bg-black text-white">
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav>
                    <header className="footer-title">Follow</header>
                    <div className='flex gap-2'>
                        <div className="grid grid-flow-col gap-4">
                            <Link><img className='lg:w-8 w-6 rounded-md' src={fb} alt="" /></Link>
                        </div>
                        <div className="grid grid-flow-col gap-4">
                            <Link><img className='lg:w-8 w-6 rounded-md' src={instagram} alt="" /></Link>
                        </div>
                        <div className="grid grid-flow-col gap-4">
                            <Link><img className='lg:w-8 w-6 rounded-md' src={twitter} alt="" /></Link>
                        </div>
                        <div className="grid grid-flow-col gap-4">
                            <Link><img className='lg:w-8 w-6 bg-white rounded-md' src={linkedin} alt="" /></Link>
                        </div>
                    </div>
                </nav>
            </footer>
            <footer className="lg:flex justify-between items-center bg-black text-white px-12 py-16">
                <div>
                    <h2 className='font-semibold text-[12px]'>HELLO@DEMOGOLDSMITH.COM</h2>
                </div>
                <div>
                    <img className='w-72 lg:py-0 py-6' src={payment} alt="" />
                </div>
                <div>
                    <h2 className='font-semibold text-[12px]'>COPYRIGHT @ {moment().format('yyyy')} GOLDSMITH</h2>
                </div>
            </footer>
        </div>
    );
};

export default Footer;