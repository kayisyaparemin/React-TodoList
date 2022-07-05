import './TodoList.css'
import React, { Component } from 'react'

export class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baslik: "",
            yapilacaklar: oku()
        }
        this.ekle = this.ekle.bind(this);
    }

    ekle(event) {
        event.preventDefault();
        const baslik = this.state.baslik.trim();
        if (baslik == "") return;
        const yeni = {
            yapildiMi: false,
            baslik: baslik
        }
        this.setState({ baslik: "", yapilacaklar: sirala(this.state.yapilacaklar.concat(yeni)) })
    }

    sil(index, event) {
        event.preventDefault();
        const yeniYapilacaklar = [...this.state.yapilacaklar];
        yeniYapilacaklar.splice(index, 1);
        this.setState({ yapilacaklar: yeniYapilacaklar });
    }

    güncelle(index, event) {
        const yeniYapilacaklar = [...this.state.yapilacaklar];
        yeniYapilacaklar[index].yapildiMi = event.target.checked;
        this.setState({ yapilacaklar: sirala(yeniYapilacaklar) });
    }
    render() {
        kaydet(this.state.yapilacaklar);
        return (
            <div className='TodoList'>
                <h1>Yapacaklarım</h1>
                <form onSubmit={this.ekle}>
                    <input className="metin-kutu" type="text" placeholder='Ne yapacaksın?' value={this.state.baslik} required onChange={(e) => this.setState({ baslik: e.target.value })} />{" "}
                    <button className="dugme">Ekle</button>
                </form>
                <div className='liste'>
                    {
                        this.state.yapilacaklar.map((oge, index) =>
                            <div className="liste-oge" key={index}>
                                <input className="liste-durum" type="checkbox" onChange={(e) => this.güncelle(index, e)} checked={oge.yapildiMi} />
                                <span className="liste-baslik">{oge.baslik}</span>
                                <a className="liste-sil" href="#" onClick={(e) => this.sil(index, e)}>&times;</a>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

function kaydet(nesne) {
    localStorage["veri"] = JSON.stringify(nesne);
}

function oku() {
    const str = localStorage["veri"];
    return str ? JSON.parse(str) : ornekVeriler();
}

function sirala(liste) {
    liste.sort((a, b) => a.yapildiMi - b.yapildiMi)
    return liste;
}

function ornekVeriler() {
    return [
        { yapildiMi: false, baslik: "React Çalış" },
        { yapildiMi: false, baslik: "Konsere Git" },
        { yapildiMi: true, baslik: "Kahve İç" },
        { yapildiMi: true, baslik: "İlacını Al" }
    ];
}
export default TodoList