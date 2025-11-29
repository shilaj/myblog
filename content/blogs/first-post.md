---
title: "Flow States and Neural Operators"
date: "2024-06-02"
excerpt: "How physics-informed neural operators are reshaping turbulence modeling pipelines."
tags: ["CFD", "AI", "Neural Operators"]
coverImage: "/blog/flow-operators.jpg"
---

Bridging traditional CFD solvers with machine learning requires more than plugging a neural network into a timestep loop. In this post, I outline a workflow for **neural operator pre-training**, data curation, and _on-the-fly_ validation that keeps physical constraints front and center.

Expect a deeper dive into:

1. Designing datasets that emphasize boundary layer behavior.
2. Training strategies that fuse simulation snapshots with sparse sensor feeds.
3. Interpreting operator attention maps to debug non-physical oscillations.
