import { useState } from "react";
import { getOverviewByUserId } from "../services/overviewService";

function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value ?? 0);
}

function OverviewPage({ navigate }) {
    const [userId, setUserId] = useState("");
    const [summary, setSummary] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const result = await getOverviewByUserId(userId);
            setSummary(result);
        } catch (error) {
            console.error("Erro ao buscar resumo:", error);
            setSummary(null);
            setErrorMessage("Nao foi possivel carregar o resumo para esse usuario.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="page-shell">
            <section className="card">
                <button
                    type="button"
                    className="button button--ghost"
                    onClick={() => navigate("/")}
                >
                    Voltar
                </button>

                <span className="eyebrow">Dashboard Financeiro</span>
                <h1>Resumo por usuario</h1>
                <p className="lead">
                    Informe o ID do usuario para consultar o saldo.
                </p>

                <form className="form-layout" onSubmit={handleSubmit}>
                    <label className="field">
                        <span>ID do usuario</span>
                        <input
                            name="userId"
                            type="number"
                            min="1"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            placeholder="Ex.: 1"
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="button button--primary button--full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Consultando..." : "Buscar resumo"}
                    </button>
                </form>

                {errorMessage ? <p className="feedback feedback--error">{errorMessage}</p> : null}

                {summary ? (
                    <section className="summary-card">
                        <h2>{summary.userName}</h2>
                        <p className="summary-id">Usuario #{summary.userId}</p>

                        <dl className="summary-grid">
                            <div>
                                <dt>Saldo</dt>
                                <dd>{formatCurrency(summary.balance)}</dd>
                            </div>
                        </dl>
                    </section>
                ) : null}
            </section>
        </main>
    );
}

export default OverviewPage;
