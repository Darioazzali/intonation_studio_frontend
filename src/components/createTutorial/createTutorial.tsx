import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./createTutorial.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  text: string;
  language: string;
  playlist: string;
  token: string;
};

const textAreaPH =
  "Maximum 20 characters per line. Each line will be considered as a separate tutorial";

const CreateTutorial = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    alert(`${data.language}, ${data.playlist}, ${data.text}, ${data.token}`);
    console.log(data);
  };

  return (
    <>
      <Container fluid className='mb-4'>
        <Row className='mb-3'>
          <Navbar />
        </Row>
      </Container>
      <Container fluid='md' className={styles.pageContainer}>
        <Row>
          <Col>
            <div className={styles.container}>
              <div className={styles.title}>
                <FontAwesomeIcon
                  icon='magic-wand-sparkles'
                  fixedWidth
                  className={styles.icon}
                />
                Tutorial Builder
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='pb-2'>
                  <label htmlFor='text-input'>Text*</label>
                  <textarea
                    id='text-input'
                    autoFocus
                    cols={20}
                    placeholder={textAreaPH}
                    {...register("text", { required: true })}
                  />
                  <div className={styles.subLabel}>
                    Maximum 20 characters per line. Each line will be considered
                    as a separate tutorial
                  </div>
                </div>
                <Row>
                  <Col md={6} className='py-2'>
                    <label htmlFor='playlist'>Language*</label>
                    <select
                      id='playlist'
                      {...register("playlist", { required: true })}
                      // className={styles.select}
                    >
                      <option label='Default' value='default' />
                      <option label='due' value='due' />
                    </select>
                    <div className={styles.subLabel}>
                      If a language is missing please let us know
                    </div>
                  </Col>

                  <Col md={6} className='py-2'>
                    <label htmlFor='language'>Playlist*</label>
                    <select
                      {...register("language", { required: true })}
                      // className={styles.select}
                    >
                      <option>Lingua</option>
                    </select>
                    <div className={styles.subLabel}>
                      If a language is missing please let us know
                    </div>
                  </Col>
                </Row>
                <Row id='disappear'></Row>
                <Row className='align-items-center '>
                  <Col md={6} className='py-2'>
                    <label htmlFor='token'>Token*</label>
                    <input
                      id='token'
                      type='text'
                      className={styles.input}
                      {...register("token", { required: true })}
                    />
                    <div className={styles.subLabel}>Add your token</div>
                  </Col>
                  <Col className='py-2'>
                    <button type='submit'>
                      <FontAwesomeIcon icon='magic-wand-sparkles' fixedWidth />
                      <span>Create New Tutorial</span>
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateTutorial;
