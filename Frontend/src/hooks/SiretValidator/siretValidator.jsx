import { useState, useMemo } from "react";
import debounce from "lodash.debounce";

export function useSiretValidator() {
  const [siretStatus, setSiretStatus] = useState(null);
  const [siretMessage, setSiretMessage] = useState("");

  // Fonction principale de vérification
  const checkSiret = async (siret) => {
    if (siret.length !== 14) {
      setSiretStatus(null);
      setSiretMessage("");
      return;
    }

    try {
      const res = await fetch(`/api/verify-siret/${siret}`);
      const data = await res.json();

      if (data.valid) {
        setSiretStatus(true);
        setSiretMessage("✅");
      } else {
        setSiretStatus(false);
        setSiretMessage(data.error || "❌");
      }
    } catch (err) {
      setSiretStatus(false);
      setSiretMessage("Erreur de vérification");
    }
  };

  // Débounce la vérif pour éviter un appel API à chaque frappe
  const validateSiret = useMemo(
    () => debounce(checkSiret, 500), // attend 500ms après la dernière frappe
    []
  );

  return { siretStatus, siretMessage, validateSiret };
}
