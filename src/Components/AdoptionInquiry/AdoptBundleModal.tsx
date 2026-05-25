import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  X, Stethoscope, Scissors, GraduationCap, Check,
  MapPin, ChevronRight, ChevronLeft, ExternalLink, Search,
} from "lucide-react";

import ALL_CLINICS from "../../data/veterinarian/vetData";
import ALL_SALONS from "../../data/grooming/groomingData";
import { TRAINING_SCHOOLS } from "../../data/training/allTrainingSchools";
import { useToast } from "../../context/ToastContext";

const DRAFT_KEY_PREFIX = "adopt-bundle-draft-";
const HISTORY_KEY = "adopt-bundle-history";

interface DraftState {
  stepIdx: number;
  selections: Record<string, Selection | null>;
  updatedAt: string;
}

interface HistoryEntry {
  petId: number;
  petName: string;
  petCity?: string;
  selections: Record<string, Selection | null>;
  confirmedAt: string;
}

const safeReadJSON = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const safeWriteJSON = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable / quota — ignore
  }
};

const loadInitialState = (petId: number) => {
  const history = safeReadJSON<HistoryEntry[]>(HISTORY_KEY) || [];
  const confirmed = history.find((h) => h.petId === petId);
  if (confirmed) {
    return { stepIdx: STEP_ORDER.length - 1, selections: confirmed.selections };
  }
  const draft = safeReadJSON<DraftState>(DRAFT_KEY_PREFIX + petId);
  if (draft) {
    return { stepIdx: draft.stepIdx, selections: draft.selections };
  }
  return null;
};

const upsertHistory = (entry: HistoryEntry) => {
  const history = safeReadJSON<HistoryEntry[]>(HISTORY_KEY) || [];
  const idx = history.findIndex((h) => h.petId === entry.petId);
  if (idx >= 0) history[idx] = entry;
  else history.unshift(entry);
  safeWriteJSON(HISTORY_KEY, history);
};

interface AdoptBundleModalProps {
  petName: string;
  petId: number;
  petCity?: string;
  onClose: () => void;
}

type StepKey = "vet" | "grooming" | "training" | "summary";

interface Selection {
  id: number | string;
  name: string;
  city: string;
  type: "vet" | "grooming" | "training";
}

const STEP_ORDER: StepKey[] = ["vet", "grooming", "training", "summary"];

const STEP_META: Record<Exclude<StepKey, "summary">, {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  browseLink: string;
}> = {
  vet: {
    title: "Veterinaras",
    subtitle: "Sveikatos patikrinimas po įvaikinimo",
    Icon: Stethoscope,
    browseLink: "/veterinarian",
  },
  grooming: {
    title: "Kirpykla",
    subtitle: "Priežiūra ir grooming",
    Icon: Scissors,
    browseLink: "/grooming",
  },
  training: {
    title: "Dresūra",
    subtitle: "Mokymai ir elgesio korekcija",
    Icon: GraduationCap,
    browseLink: "/training",
  },
};

const normalizeCity = (c: string | undefined | null) =>
  (c || "").toLowerCase().replace(/[„""]/g, "").trim();

interface StepOption {
  id: number | string;
  name: string;
  city: string;
  sub: string;
}

const AdoptBundleModal: React.FC<AdoptBundleModalProps> = ({
  petName,
  petId,
  petCity,
  onClose,
}) => {
  const { showSuccess } = useToast();

  const initial = useMemo(() => loadInitialState(petId), [petId]);
  const [stepIdx, setStepIdx] = useState(initial?.stepIdx ?? 0);
  const [search, setSearch] = useState("");
  const [selections, setSelections] = useState<Record<string, Selection | null>>(
    initial?.selections ?? { vet: null, grooming: null, training: null }
  );

  // Skip the very first save so we don't immediately overwrite freshly restored state.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const draft: DraftState = { stepIdx, selections, updatedAt: new Date().toISOString() };
    safeWriteJSON(DRAFT_KEY_PREFIX + petId, draft);
  }, [petId, stepIdx, selections]);

  const step = STEP_ORDER[stepIdx];
  const isSummary = step === "summary";

  const petCityNorm = normalizeCity(petCity);

  const options: StepOption[] = useMemo(() => {
    if (isSummary) return [];

    const q = search.trim().toLowerCase();

    const byCity = <T extends { city?: string | null }>(arr: T[]) => {
      if (!petCityNorm) return arr;
      const inCity = arr.filter((x) => normalizeCity(x.city) === petCityNorm);
      const rest = arr.filter((x) => normalizeCity(x.city) !== petCityNorm);
      return [...inCity, ...rest];
    };

    if (step === "vet") {
      const list = byCity(ALL_CLINICS).map((c) => ({
        id: c.id,
        name: c.fullName || c.name,
        city: c.city,
        sub: c.address || "",
      }));
      return q
        ? list.filter((x) => x.name.toLowerCase().includes(q) || x.city.toLowerCase().includes(q))
        : list;
    }

    if (step === "grooming") {
      const list = byCity(
        ALL_SALONS.map((s) => ({
          id: s.id,
          name: s.businessName || s.title || "Salonas",
          city: s.city || "",
        }))
      ).map((x) => ({ ...x, sub: "" }));
      return q
        ? list.filter((x) => x.name.toLowerCase().includes(q) || x.city.toLowerCase().includes(q))
        : list;
    }

    const list = byCity(
      TRAINING_SCHOOLS.map((t) => ({
        id: t.id,
        name: t.name,
        city: t.city,
        sub: t.address || "",
      }))
    );
    return q
      ? list.filter((x) => x.name.toLowerCase().includes(q) || x.city.toLowerCase().includes(q))
      : list;
  }, [step, isSummary, search, petCityNorm]);

  const handleSelect = (item: StepOption) => {
    if (isSummary) return;
    setSelections((prev) => ({
      ...prev,
      [step]: { ...item, type: step as Selection["type"] },
    }));
  };

  const goNext = () => {
    setSearch("");
    setStepIdx((i) => Math.min(i + 1, STEP_ORDER.length - 1));
  };

  const goBack = () => {
    setSearch("");
    setStepIdx((i) => Math.max(i - 1, 0));
  };

  const skipStep = () => {
    setSelections((prev) => ({ ...prev, [step]: null }));
    goNext();
  };

  const handleConfirm = () => {
    const entry: HistoryEntry = {
      petId,
      petName,
      petCity,
      selections,
      confirmedAt: new Date().toISOString(),
    };
    upsertHistory(entry);
    try {
      localStorage.removeItem(DRAFT_KEY_PREFIX + petId);
    } catch {
      // ignore
    }
    showSuccess(`Įvaikinimas patvirtintas: ${petName}`, 4000);
    onClose();
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Įsivaikinti {petName} — priežiūros paketas
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Pasirinkite paslaugas, kurias norite suplanuoti iš anksto. Galite praleisti bet kurį žingsnį.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Uždaryti"
            className="text-gray-400 hover:text-gray-600 transition flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          {(["vet", "grooming", "training"] as const).map((key, i) => {
            const meta = STEP_META[key];
            const Icon = meta.Icon;
            const isActive = step === key;
            const isDone = STEP_ORDER.indexOf(step) > i;
            const isSelected = !!selections[key];
            return (
              <React.Fragment key={key}>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition
                  ${isActive ? "bg-purple-100 text-purple-700" : isDone ? "bg-gray-100 text-gray-700" : "bg-gray-50 text-gray-400"}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{meta.title}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                {i < 2 && <div className="flex-1 h-px bg-gray-200" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isSummary ? (
            <SummaryView petName={petName} selections={selections} />
          ) : (
            <StepView
              step={step as Exclude<StepKey, "summary">}
              petCity={petCity}
              options={options}
              selected={selections[step]}
              search={search}
              onSearch={setSearch}
              onSelect={handleSelect}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            onClick={goBack}
            disabled={stepIdx === 0}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Atgal
          </button>

          <div className="flex items-center gap-3">
            {!isSummary && (
              <button
                onClick={skipStep}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Praleisti
              </button>
            )}

            {isSummary ? (
              <button
                onClick={handleConfirm}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              >
                Patvirtinti įvaikinimą
                {selectedCount > 0 && ` (+${selectedCount})`}
              </button>
            ) : (
              <button
                onClick={goNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              >
                {selections[step] ? "Tęsti" : "Toliau"}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepView: React.FC<{
  step: Exclude<StepKey, "summary">;
  petCity?: string;
  options: StepOption[];
  selected: Selection | null;
  search: string;
  onSearch: (v: string) => void;
  onSelect: (item: StepOption) => void;
}> = ({ step, petCity, options, selected, search, onSearch, onSelect }) => {
  const meta = STEP_META[step];
  const Icon = meta.Icon;
  const topN = options.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{meta.title}</h3>
          <p className="text-xs text-gray-500">{meta.subtitle}</p>
        </div>
        <Link
          to={meta.browseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:underline"
        >
          Peržiūrėti visus
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {petCity && (
        <p className="text-xs text-gray-500 inline-flex items-center gap-1.5">
          <MapPin className="w-3 h-3" />
          Rodomi pasiūlymai pagal miestą: <span className="font-semibold text-gray-700">{petCity}</span>
        </p>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Ieškoti pagal pavadinimą ar miestą..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />
      </div>

      <div className="space-y-2">
        {topN.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Nieko nerasta.</p>
        ) : (
          topN.map((opt) => {
            const isPicked = selected?.id === opt.id;
            return (
              <button
                key={`${step}-${opt.id}`}
                type="button"
                onClick={() => onSelect(opt)}
                className={`w-full text-left flex items-center justify-between gap-3 p-3.5 rounded-xl border transition
                  ${isPicked
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
              >
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{opt.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{opt.city}{opt.sub && ` · ${opt.sub}`}</span>
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition
                  ${isPicked ? "bg-purple-600 text-white" : "border-2 border-gray-300"}`}
                >
                  {isPicked && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })
        )}
      </div>

      {options.length > topN.length && (
        <p className="text-xs text-gray-500 text-center">
          Rodomi {topN.length} iš {options.length}. Naudokite paiešką arba{" "}
          <Link to={meta.browseLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">
            peržiūrėkite visus
          </Link>
          .
        </p>
      )}
    </div>
  );
};

const SummaryView: React.FC<{
  petName: string;
  selections: Record<string, Selection | null>;
}> = ({ petName, selections }) => {
  const items = (["vet", "grooming", "training"] as const).map((k) => ({
    key: k,
    meta: STEP_META[k],
    sel: selections[k],
  }));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-gray-900">Jūsų paketas {petName}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Peržiūrėkite pasirinkimus prieš patvirtindami. Galite grįžti atgal ir pakeisti.
        </p>
      </div>

      <div className="space-y-2">
        {items.map(({ key, meta, sel }) => {
          const Icon = meta.Icon;
          return (
            <div
              key={key}
              className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                sel ? "border-emerald-200 bg-emerald-50/50" : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className={`p-2 rounded-lg ${sel ? "bg-white text-emerald-600" : "bg-white text-gray-400"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">{meta.title}</p>
                <p className="font-semibold text-gray-900 truncate">
                  {sel ? sel.name : "Praleista"}
                </p>
                {sel && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {sel.city}
                  </p>
                )}
              </div>
              {sel && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-sm text-purple-900">
        Patvirtinę įvaikinimą gausite el. laišką su detalia informacija ir pasirinktų paslaugų teikėjų kontaktais.
      </div>
    </div>
  );
};

export default AdoptBundleModal;
