import { supabase } from '../utils/supabaseClient.js';

export const createExecutive = async (req, res) => {
  const { name, email, phone } = req.body;

  const { data, error } = await supabase
    .from('executives')
    .insert([{ name, email, phone }])
    .select()
    .limit(1);

  if (error) return res.status(400).json({ error });
  res.status(201).json(data[0]);
};

export const listExecutives = async (req, res) => {
  const { data, error } = await supabase.from('executives').select('*').order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error });
  res.json(data);
};

export const getExecutiveById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('executives').select('*').eq('id', id).limit(1);

  if (error || data.length === 0) return res.status(404).json({ error: 'Executive not found' });
  res.json(data[0]);
};

export const updateExecutive = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const { data, error } = await supabase
    .from('executives')
    .update({ name, email, phone })
    .eq('id', id)
    .select()
    .limit(1);

  if (error || data.length === 0) return res.status(400).json({ error });
  res.json(data[0]);
};

export const deleteExecutive = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('executives').delete().eq('id', id);

  if (error) return res.status(400).json({ error });
  res.status(204).send();
};
