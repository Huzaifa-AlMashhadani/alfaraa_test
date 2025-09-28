"use client"

import { useState } from "react"
import Select from "react-select"
import styles from "./saerch.module.css"
import { useRouter } from "next/navigation"
import {useSearch} from "@/hooks/search/useSearch";
import Loading from "@/app/ui/loaders/Loading";

type Brand = { id: number; ar_name: string }
type Module = { id: number; ar_name: string; make_by: number }
type ModuleDate = { id: number; date_form: number; date_to: number; module_by: number }
type Engine = { id: number; ar_name: string; en_name: string; module_date_by: number }

type ApiData = { brands: Brand[]; module: Module[]; enginees: Engine[]; ModuleDate: ModuleDate[] }

const Search = () => {
    const router = useRouter()


  const [selectedBrand, setSelectedBrand] = useState<number | null>(null)
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedEngine, setSelectedEngine] = useState<number | null>(null)
    const {data, isLoading} = useSearch();

    if (!data || isLoading) return;
  // الموديلات بعد اختيار الشركة
  const filteredModules = selectedBrand
    ? data.module.filter((m) => m.make_by === selectedBrand)
    : []

  // فترات الموديل (ModuleDate) بعد اختيار الموديل
  const filteredModuleDates = selectedModule
    ? data.ModuleDate.filter((md) => md.module_by === selectedModule)
    : []

  // تحويل الفترات إلى قائمة سنوات فردية
  const yearsOptions = filteredModuleDates.flatMap((md) => {
  const years: { value: number; label: number }[] = []
  for (let y = md.date_form; y <= md.date_to; y++) { // <-- هنا استخدمنا date_form بدل date_from
    years.push({ value: y, label: y })
  }
  return years
})

  // المحركات المتاحة بعد اختيار الموديل
  const filteredEngines = selectedModule
    ? data.enginees.filter((e) =>
        filteredModuleDates.some((md) => md.id === e.module_date_by)
      )
    : []

  const handleSearch = () => {
    if (!selectedBrand || !selectedModule || !selectedYear || !selectedEngine) {
      alert("اختر الشركة والموديل والسنة والمحرك")
      return
    }

    const engineName =
      filteredEngines.find((e) => e.id === selectedEngine)?.en_name || ""

    router.push(
      `/SearchResult?brand=${selectedBrand}&model=${selectedModule}&year=${selectedYear}&engine=${engineName}`
    )
  }

  return (
    <div className={styles.search}>
      <Select
        options={data.brands.map((b) => ({ value: b.id, label: b.ar_name }))}
        placeholder="اختر الشركة"
        className={styles.select}
        onChange={(option) => {
          setSelectedBrand(option ? option.value : null)
          setSelectedModule(null)
          setSelectedYear(null)
          setSelectedEngine(null)
        }}
        isClearable
      />

      <Select
        options={filteredModules.map((m) => ({ value: m.id, label: m.ar_name }))}
        placeholder="اختر الموديل"
        className={styles.select}
        onChange={(option) => {
          setSelectedModule(option ? option.value : null)
          setSelectedYear(null)
          setSelectedEngine(null)
        }}
        isDisabled={!selectedBrand}
        isClearable
      />

      <Select
        options={yearsOptions}
        placeholder="اختر السنة"
        className={styles.select}
        onChange={(option) => setSelectedYear(option ? option.value : null)}
        isDisabled={!selectedModule}
        isClearable
      />

      <Select
        options={filteredEngines.map((e) => ({ value: e.id, label: e.ar_name }))}
        placeholder="اختر المحرك"
        className={styles.select}
        onChange={(option) => setSelectedEngine(option ? option.value : null)}
        isDisabled={!selectedModule}
        isClearable
      />

      <button type="button" onClick={handleSearch}>
        بحث الان
      </button>
    </div>
  )
}

export default Search
