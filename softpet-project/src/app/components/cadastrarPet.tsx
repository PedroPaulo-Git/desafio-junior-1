import styles from "../../styles/cadastrarpet.module.css";
import Modal from "./Modal";
import PetIcon from './icons/PetIcon';
import PetDonoIcon from './icons/PetDonoIcon.svg';
import PetNameIcon from './icons/PetNameIcon.svg';
import CadastroIcon from './icons/CadastroIcon.svg';
import VoltarCadastroIcon from './icons/VoltarCadastroIcon.svg'
import SelectAnimalIcon from './icons/SelectAnimalIcon.svg';
import TelefoneIcon from './icons/TelefoneIcon.svg'
import DataIcon from './icons/DataIcon.svg';
import React, { FormEventHandler, useState } from 'react';
import { IPets } from '../../../types/pets';
import { addPets } from "../../../api";
import { useRouter } from "next/navigation";


export default function CadastrarPet({pets }) {
    const router = useRouter()
    const [petCadastro, setPetCadastro] = useState<IPets>({ ...pets });
    const [abrirCadastro, setAbrirCadastro] = useState<boolean>(false);
    const [newPetValue, setNewPetValue] = useState<IPets>({

        nome: "",
        animal: "",
        dono: "",
        raca: "",
        telefone: '',
        nascimento: ""
    });


    const handleSubmitPets: FormEventHandler<HTMLFormElement> = async (e) => {

        await addPets(newPetValue);
        setNewPetValue({
            nome: "",
            animal: "",
            dono: "",
            raca: "",
            telefone: '',
            nascimento: ""
        });
        setAbrirCadastro(false)
        console.log(newPetValue)
        router.refresh()

    }
    const handleAnimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPetValue({ ...newPetValue, animal: e.target.value });
    };
     const FormatPhone = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const formatted = cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        
        return formatted;
    };

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;

        const formattedPhoneNumber = FormatPhone(phoneNumber);

        setNewPetValue({ ...newPetValue, telefone: formattedPhoneNumber });
    };





    return (
        <div className={styles.cadastrarPetForm}>

            <button className={styles.buttonAbrirCadastro} onClick={() => setAbrirCadastro(true)}>
                <CadastroIcon />
                Cadastrar
            </button>

            <Modal AbrirModal={abrirCadastro} setAbrirModal={setAbrirCadastro}>

                <form onSubmit={handleSubmitPets} className={styles.PetForm}>
                    <div className={styles.infoCadastro_Nome}>

                        <span> <PetNameIcon /><label>Nome</label></span>
                        <input
                            value={newPetValue.nome}
                            onChange={e => setNewPetValue({ ...newPetValue, nome: e.target.value })}
                            placeholder="Nome Sobrenome" type="text" 
                            required />

                    </div>
                    <div className={styles.infoCadastro_Animal}>
                    <span><SelectAnimalIcon /><label>Animal</label></span>
                        <div className={styles.ContainerSelectAnimal}>                            
                        
                        <span onClick={() => {
                                if (petCadastro.animal !== "cachorro") {
                                    setPetCadastro({ ...petCadastro, animal: "cachorro" });
                                }
                            }} className={`${styles.selectAnimal} ${petCadastro.animal === "cachorro" ? styles.checked : ''}`}>
                                <input
                                    onChange={handleAnimalChange}
                                    type="radio" id="opcao1"
                                    name="animal"
                                    value="cachorro"
                                    checked={newPetValue.animal === "cachorro"}
                                    required  />
                                <label htmlFor="opcao1">Cachorro</label>
                            </span>

                            <span onClick={() => {
                                if (petCadastro.animal !== "gato") {
                                    setPetCadastro({ ...petCadastro, animal: "gato" });
                                }
                            }} className={`${styles.selectAnimal} ${petCadastro.animal === "gato" ? styles.checked : ''}`}>
                                {/*  */}
                                <input
                                    onChange={handleAnimalChange}
                                    type="radio" id="opcao2"
                                    name="animal"
                                    value="gato"
                                    checked={newPetValue.animal === "gato"} 
                                    required />
                                <label htmlFor="opcao2">Gato</label>
                            </span>
                        </div>
                        

                    </div>
                    <div className={styles.infoCadastro_Dono}>
                        <span> <PetDonoIcon /><label>Dono</label></span>
                        <input
                            value={newPetValue.dono}
                            onChange={e => setNewPetValue({ ...newPetValue, dono: e.target.value })}
                            placeholder="Nome Sobrenome" type="text"
                            required  />
                    </div>
                    <div className={styles.infoCadastro_raca}>
                        <span><SelectAnimalIcon /><label>Raça</label></span>
                        <input
                            value={newPetValue.raca}
                            onChange={e => setNewPetValue({ ...newPetValue, raca: e.target.value })}
                            placeholder="Raça" type="text"
                              />
                    </div>
                    <div className={styles.infoCadastro_Telefone}>
                        <span><TelefoneIcon /><label>Telefone</label></span>
                        <input
                            value={newPetValue.telefone}
                            onChange={handlePhoneChange}
                            placeholder="(00) 0 0000-0000" type="tel" name="" id="" 
                            required 
                            maxLength={12} />
                    </div>
                    <div className={styles.infoCadastro_Nascimento}>
                        <span><DataIcon /><label>Nascimento</label></span>
                        <input
                            value={newPetValue.nascimento}
                            onChange={(e) => setNewPetValue({ ...newPetValue, nascimento: e.target.value })}
                            placeholder="22/08/2020" type="date" name="" id=""
                            maxLength={12} 
                            max={(new Date()).toISOString().split("T")[0]}
                            min="1900-01-01"
                            required />
                    </div>
                    <footer className={styles.footerCadastroPet}>
                        <button onClick={() => setAbrirCadastro(false)} className={styles.buttonVoltarCadastroPet}>
                            <span><VoltarCadastroIcon /></span>
                        </button>

                        <button type="submit" className={styles.buttonCadastrarPet}>
                            <span><CadastroIcon />
                                <span style={{ paddingLeft: 5 }}>Cadastrar</span>
                            </span>

                        </button>
                    </footer>

                </form>

            </Modal>
        </div>
    );
}
