/*

    const authHeader = request.headers.authorization;

    if (authHeader === "Bearer") {
        // Neste if eu estou verificando se existe token dentro de authHeader
        // O que authHeader está recebendo é "Bearer alnfjkabdahbkbsajksbd(<- um token)"
        // Quando o token está ausente, o que authHeader recebe é somente "Bearer", logo, authHeader nunca estará vazio
        throw new AppError("O token está ausente.");
    }

    if (!authHeader) {
        // Este if é somente para o authHeader do .split abaixo não fique com erro
        // O conteudo dentro deste if não será acessado
        throw new AppError("O token está ausente.");
    }

    // Bearer kjbcaadgajlbdabsdudbfuiagduisbd
    const [, token] = authHeader.split(" ");

*/
