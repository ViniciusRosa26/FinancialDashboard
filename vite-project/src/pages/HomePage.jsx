// Página inicial com atalhos para os cadastros principais do sistema.
function HomePage({ navigate }) {
    return (
        <main className="page-shell">
            <section className="card card--hero">
                <span className="eyebrow">Dashboard Financeiro</span>
                <h1>Central de cadastros do sistema</h1>
                <p className="lead">
                    Escolha a entidade que deseja cadastrar para alimentar o backend com
                    usuários, patrimônios, rendas e despesas.
                </p>

                <div className="actions-grid">
                    <button
                        type="button"
                        className="button button--primary"
                        onClick={() => navigate("/users")}
                    >
                        Cadastrar usuário
                    </button>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => navigate("/heritages")}
                    >
                        Cadastrar patrimônio
                    </button>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => navigate("/incomes")}
                    >
                        Cadastrar Renda
                    </button>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => navigate("/expenses")}
                    >
                        Cadastrar Despesa
                    </button>

                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => navigate("/overviews")}
                    >
                        Ver resumo
                    </button>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
