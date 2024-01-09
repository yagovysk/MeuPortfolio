import './Testimonials.css';
import foto1 from '../../assets/perfil1.jpg';
import foto2 from '../../assets/perfil-2.png';
import foto3 from '../../assets/perfil-3.jpg';
import { MdArrowForwardIos } from 'react-icons/md';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export function Testimonials() {
  const customArrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '24px',
    zIndex: 1,
  };

  const CustomArrowPrev = ({ onClick }) => (
    <div
      style={{ ...customArrowStyles, left: '110px' }}
      onClick={onClick}
      title="Previous">
      <MdOutlineArrowBackIosNew className="icon-left" />
    </div>
  );

  const CustomArrowNext = ({ onClick }) => (
    <div
      style={{ ...customArrowStyles, right: '110px' }}
      onClick={onClick}
      title="Next">
      <MdArrowForwardIos className="icon-right" />
    </div>
  );
  return (
    <section className="testimonial-section">
      <h2 className="section-title">
        O que dizem <br />
        Sobre mim?
      </h2>
      <div className="testimonial-container">
        <div className="testimonial-swiper">
          <div>
            <Carousel
              className="container-carousel"
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              showIndicators={true}
              swipeable={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
              renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && <CustomArrowPrev onClick={() => onClickHandler()} />
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && <CustomArrowNext onClick={() => onClickHandler()} />
              }>
              <article className="testimonial-card">
                <div className="testimonial-border">
                  <img src={foto1} alt="" className="testimonial-img" />
                </div>
                <h2 className="testimonial-name">Geovanna de Souza Lira</h2>
                <p className="testimonial-description">
                  Eu solicitei uma landing page para minha empresa, o serviço
                  foi rápido e bem feito, gostaria de parabenizar o Yago por um
                  excelente trabalho.
                </p>
              </article>
              <article className="testimonial-card">
                <div className="testimonial-border">
                  <img src={foto2} alt="" className="testimonial-img" />
                </div>
                <h2 className="testimonial-name">Leonardo Ferreira de Melo</h2>
                <p className="testimonial-description">
                  Super recomendo, preços acessíveis, atendimento e
                  esclarecimento de dúvidas ótimos. Só Sucesso!
                </p>
              </article>
              <article className="testimonial-card">
                <div className="testimonial-border">
                  <img src={foto3} alt="" className="testimonial-img" />
                </div>
                <h2 className="testimonial-name">Lucas Monteiro Lima</h2>
                <p className="testimonial-description">
                  Contrato respeitando todos os críterios, soube extrair bem a
                  necessidade que eu tinha para melhorar a prospecção do meu
                  negócio, recomendo demais.
                </p>
              </article>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
